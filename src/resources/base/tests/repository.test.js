const BaseRepository = require('../repository')

describe('BaseRepository', () => {
  it('calls the find method correctly', () => {
    const mockResult = [{ property: 'value' }]
    const fakeSchema = { find: jest.fn().mockReturnValue(mockResult) }

    const result = new BaseRepository(fakeSchema).find()

    expect(fakeSchema.find).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockResult)
  })

  it('calls the find method with the argument query correctly', () => {
    const mockResult = [{ property: 'value' }]
    const mockQuery = { name: 'fake_name' }
    const fakeSchema = { find: jest.fn().mockReturnValue(mockResult) }

    const result = new BaseRepository(fakeSchema).find(mockQuery)

    expect(fakeSchema.find).toHaveBeenCalledTimes(1)
    expect(fakeSchema.find).toHaveBeenCalledWith(mockQuery)
    expect(result).toEqual(mockResult)
  })

  it('calls the findOne method correctly', () => {
    const id = 'fake_id'
    const mockResult = { name: 'fake_name' }
    const fakeSchema = {
      findById: jest.fn().mockReturnValue(mockResult)
    }

    const result = new BaseRepository(fakeSchema).findOne(id)

    expect(fakeSchema.findById).toHaveBeenCalledTimes(1)
    expect(fakeSchema.findById).toHaveBeenCalledWith(id)
    expect(result).toEqual(mockResult)
  })

  it('calls the create method correctly', () => {
    const mockData = { name: 'name_fake', description: 'description' }
    const fakeSchema = {
      create: jest.fn().mockReturnValue(mockData)
    }

    const result = new BaseRepository(fakeSchema).create(mockData)

    expect(fakeSchema.create).toHaveBeenCalledTimes(1)
    expect(fakeSchema.create).toHaveBeenCalledWith(mockData)
    expect(result).toEqual(mockData)
  })

  it('calls the update method correctly', () => {
    const id = 'fake_id'
    const mockData = { name: 'name_fake', description: 'description' }
    const mockResult = { ok: true }
    const fakeSchema = {
      update: jest.fn().mockReturnValue(mockResult)
    }

    const result = new BaseRepository(fakeSchema).update(id, mockData)

    expect(fakeSchema.update).toHaveBeenCalledTimes(1)
    expect(fakeSchema.update).toHaveBeenCalledWith({ _id: id }, { $set: mockData })
    expect(result).toEqual(mockResult)
  })

  it('calls the remove method correctly', () => {
    const id = 'fake_id'
    const mockResult = { ok: true }
    const fakeSchema = {
      remove: jest.fn().mockReturnValue(mockResult)
    }

    const result = new BaseRepository(fakeSchema).remove(id)

    expect(fakeSchema.remove).toHaveBeenCalledTimes(1)
    expect(fakeSchema.remove).toHaveBeenCalledWith({ _id: id })
    expect(result).toEqual(mockResult)
  })
})
