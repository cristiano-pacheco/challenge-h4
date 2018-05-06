const BaseHandler = require('../handler')

describe('BaseHandler', () => {
  it('calls the list method correctly', async done => {
    const mockData = [{ property: 'value' }]
    const fakeRepository = { find: jest.fn().mockReturnValue(mockData) }

    const response = await new BaseHandler(fakeRepository).list()

    expect(fakeRepository.find).toHaveBeenCalledTimes(1)
    expect(response).toEqual({ data: mockData })
    done()
  })

  it('calls the findOne method correctly', async done => {
    const request = {
      params: {
        id: 'fake_id'
      }
    }
    const mockData = { name: 'fake_name' }
    const fakeRepository = {
      findOne: jest.fn().mockReturnValue(mockData)
    }

    const response = await new BaseHandler(fakeRepository).findOne(request, null)

    expect(fakeRepository.findOne).toHaveBeenCalledTimes(1)
    expect(fakeRepository.findOne).toHaveBeenCalledWith('fake_id')
    expect(response).toEqual({ data: mockData })
    done()
  })

  it('calls the create method correctly', async done => {
    const payload = { name: 'name_fake' }
    const request = { payload }
    const h = {
      response: jest.fn().mockReturnValue(({
        payload,
        code: statusCode => ({
          payload,
          statusCode
        })
      }))
    }
    const fakeRepository = {
      create: jest.fn().mockReturnValue(payload)
    }

    const response = await new BaseHandler(fakeRepository).create(request, h)

    expect(fakeRepository.create).toHaveBeenCalledTimes(1)
    expect(fakeRepository.create).toHaveBeenCalledWith(request.payload)
    expect(response).toEqual({ payload, statusCode: 201 })
    done()
  })

  it('calls the update method correctly', async done => {
    const payload = { name: 'fake_name' }
    const request = {
      payload,
      params: {
        id: 'fake_id'
      }
    }
    const fakeRepository = {
      update: jest.fn().mockReturnValue({ ok: true }),
      findOne: id => ({
        count: jest.fn().mockReturnValue(true)
      })
    }

    const response = await new BaseHandler(fakeRepository).update(request)

    expect(fakeRepository.update).toHaveBeenCalledTimes(1)
    expect(response).toEqual({ data: { id: 'fake_id', ...payload } })
    done()
  })

  it('calls the remove method correctly', async done => {
    const request = {
      params: {
        id: 'fake_id'
      }
    }
    const h = {
      response: jest.fn().mockReturnValue(({
        code: statusCode => ({ statusCode })
      }))
    }
    const fakeRepository = {
      remove: jest.fn(),
      findOne: id => ({
        count: jest.fn().mockReturnValue(true)
      })
    }

    const response = await new BaseHandler(fakeRepository).remove(request, h)

    expect(fakeRepository.remove).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toEqual(204)
    done()
  })

  describe('Bad Path', () => {
    it('findOne should return the 404 http status code when the resource is not found', async done => {
      const request = {
        params: {
          id: 'fake_id'
        }
      }

      const fakeRepository = {
        findOne: jest.fn().mockReturnValue(null)
      }

      const response = await new BaseHandler(fakeRepository).findOne(request, null)

      expect(fakeRepository.findOne).toHaveBeenCalledTimes(1)
      expect(fakeRepository.findOne).toHaveBeenCalledWith('fake_id')
      expect(response.isBoom).toBe(true)
      expect(response.output.statusCode).toBe(404)
      expect(response.output.payload.message).toBe('Resource not found.')
      done()
    })

    it('update should return the 404 http status code when the resource is not found', async done => {
      const payload = { name: 'fake_name' }
      const request = {
        payload,
        params: {
          id: 'fake_id'
        }
      }
      const fakeRepository = {
        update: jest.fn().mockReturnValue({ ok: true }),
        findOne: id => ({
          count: jest.fn().mockReturnValue(null)
        })
      }

      const response = await new BaseHandler(fakeRepository).update(request)

      expect(response.isBoom).toBe(true)
      expect(response.output.statusCode).toBe(404)
      expect(response.output.payload.message).toBe('Resource not found.')
      done()
    })

    it('remove should return the 404 http status code when the resource is not found', async done => {
      const request = {
        params: {
          id: 'fake_id'
        }
      }
      const h = {
        response: jest.fn().mockReturnValue(({
          code: statusCode => ({ statusCode })
        }))
      }
      const fakeRepository = {
        remove: jest.fn(),
        findOne: id => ({
          count: jest.fn().mockReturnValue(null)
        })
      }

      const response = await new BaseHandler(fakeRepository).remove(request, h)

      expect(response.isBoom).toBe(true)
      expect(response.output.statusCode).toBe(404)
      expect(response.output.payload.message).toBe('Resource not found.')
      done()
    })
  })
})
