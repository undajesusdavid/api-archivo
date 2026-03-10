export const USE_CASE = Symbol('UseCase');

export interface IUseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}
