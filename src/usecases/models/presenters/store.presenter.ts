import { Store } from 'src/domain/entities/store.entity'
import { EmployeePresenter } from './employee.presenter'

export class StorePresenter {
  id: string
  alternateId: number
  createdAt: Date
  name: string
  address: string
  document?: string | null
  logo?: string | null
  active: boolean

  employees: EmployeePresenter[]

  static mapper = (entity: Store) => {
    if (!entity) return null
    const model = new StorePresenter()
    model.id = entity.id
    model.alternateId = entity.alternateId
    model.createdAt = entity.createdAt
    model.name = entity.name
    model.address = entity.address
    model.document = entity.document
    model.logo = entity.logo
    model.active = entity.active

    model.employees = EmployeePresenter.mapperArray(entity.employees)

    return model
  }

  static mapperArray(entities: Array<Store>) {
    if (!entities) return null
    const models = new Array<StorePresenter>()
    entities.forEach((entity) => models.push(StorePresenter.mapper(entity)))

    return models
  }
}