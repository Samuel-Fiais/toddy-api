import { Injectable } from '@nestjs/common';
import { StorePresenter } from '../models/presenters/store.presenter';
import { ILogger } from 'src/domain/logger/logger.interface';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { IStoreRepository } from 'src/domain/repositories/store.repository.interface';

@Injectable()
export class GetAllStoreUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _storeRepository: IStoreRepository,
    private readonly _exceptionService: IException
  ) {}

  async execute(): Promise<StorePresenter[]> {
    try {
      this._logger.log('GetAllStoreUseCase execute', 'Start to find all store');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const entities = await this._storeRepository.findAll();
      let presenters = StorePresenter.mapperArray(entities);

      if (presenters.length <= 0)
        this._exceptionService.applicationNotFound('stores');

      this._logger.log(
        'GetAllStoreUseCase execute',
        'Searching all stores was successful'
      );

      return presenters;
    } catch (e) {
      this._logger.error(
        'GetAllStoreUseCase execute',
        'Error when try to find all stores'
      );
      if (e as IException) throw e;
      this._exceptionService.applicationOperationFindRepository('Loja');
    }
  }
}
