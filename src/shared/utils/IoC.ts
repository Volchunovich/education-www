import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { useMemo } from 'react';
import ServiceIdentifier = interfaces.ServiceIdentifier;

const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

// You can add here external services to container

const provide = {
  singleton: () => (target: ServiceIdentifier<any>) =>
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

function bindToContainer(identifier: ServiceIdentifier<any>) {
  const provideMetadata = (Reflect.getMetadata(PROVIDE_METADATA_KEY, Reflect) || []).filter(
    (metadata: IProvideSyntax) => metadata.implementationType === identifier,
  );

  if (provideMetadata.length === 0) {
    throw new Error(`Provided identifier isn't registered: ${identifier.toString()}`);
  }

  container.load(
    new ContainerModule(bind => {
      provideMetadata.forEach((metadata: IProvideSyntax) => metadata.constraint(bind, metadata.implementationType));
    }),
  );
}

function lazyInject(identifier: ServiceIdentifier<any>) {
  return (target: any, key: string) => {
    if (!container.isBound(identifier)) {
      bindToContainer(identifier);
    }

    Object.defineProperty(target, key, {
      get: () => container.get(identifier),
      enumerable: true,
    });
  };
}

function useStore<T>(identifier: ServiceIdentifier<T>): T {
  return useMemo(() => {
    if (!container.isBound(identifier)) {
      bindToContainer(identifier);
    }

    return container.get(identifier);
  }, []);
}

export { container, provide, lazyInject, useStore };
