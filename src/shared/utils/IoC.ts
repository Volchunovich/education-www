import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { useEffect, useMemo, useState } from 'react';

const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

// You can add here external services to container

const provide = {
  singleton: () => (target: any) =>
    fluentProvide(target)
      .inSingletonScope()
      .done()(target),

  transient: () => (target: any) =>
    fluentProvide(target)
      .inTransientScope()
      .done()(target),
};

interface IProvideSyntax {
  constraint: (bind: interfaces.Bind, target: any) => any;
  implementationType: any;
}

const PROVIDE_METADATA_KEY = 'inversify-binding-decorators:provide';

const lazyInject = (identifier: any) => (target: any, key: string) => {
  const isBound = container.isBound(identifier);
  if (!isBound) {
    const provideMetadata = (
      Reflect.getMetadata(PROVIDE_METADATA_KEY, Reflect) || []
    ).filter(
      (metadata: IProvideSyntax) => metadata.implementationType === identifier
    );

    if (provideMetadata.length === 0) {
      throw new Error(`Provided identifier isn't registered: ${identifier}`);
    }

    container.load(
      new ContainerModule((bind: any) => {
        provideMetadata.forEach((metadata: IProvideSyntax) =>
          metadata.constraint(bind, metadata.implementationType)
        );
      })
    );
  }

  Object.defineProperty(target, key, {
    get: () => container.get(identifier),
    enumerable: true,
  });
};

// TODO: Refactor
export function useLazyInject<T>(identifier: any): boolean {
  useEffect(() => {
    console.log('effect');
  });

  return true;
  // return useMemo(() => {
  //   debugger;
  //   const isBound = container.isBound(identifier);
  //
  //   if (!isBound) {
  //     const provideMetadata = (
  //       Reflect.getMetadata(PROVIDE_METADATA_KEY, Reflect) || []
  //     ).filter(
  //       (metadata: IProvideSyntax) => metadata.implementationType === identifier
  //     );
  //
  //     if (provideMetadata.length === 0) {
  //       throw new Error(`Provided identifier isn't registered: ${identifier}`);
  //     }
  //
  //     container.load(
  //       new ContainerModule((bind: any) => {
  //         provideMetadata.forEach((metadata: IProvideSyntax) =>
  //           metadata.constraint(bind, metadata.implementationType)
  //         );
  //       })
  //     );
  //   }
  //
  //   return container.get(identifier);
  // }, []);
}

export { container, provide, lazyInject };
