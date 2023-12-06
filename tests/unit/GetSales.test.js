const request = require('supertest');
const { mocked } = require('ts-jest/dist/utils');
const getSalesRouter = require('../../src/routes/GetSales');
const { DatabaseService } = require('../../src/data/service');

jest.mock('../../src/data/service');

const mockDatabaseService = mocked(DatabaseService.getInstance, true);

describe('GET /total/orders', () => {
  it('should return total orders', async () => {
    mockDatabaseService.mockReturnValue({
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          getCount: jest.fn().mockResolvedValue(42),
        }),
      }),
    });

    const response = await request(getSalesRouter).get('/total/orders');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(42);
  });

  it('should handle errors', async () => {
    mockDatabaseService.mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const response = await request(getSalesRouter).get('/total/orders');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error Getting Total Orders' });
  });
});

// Similar tests for /total/revenue and /total/customers
describe('GET /total/revenue', () => {
  it('should return total revenue', async () => {
    mockDatabaseService.mockReturnValue({
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              getRawOne: jest.fn().mockResolvedValue({ total: 1000 }),
            }),
          }),
        }),
      }),
    });

    const response = await request(getSalesRouter).get('/total/revenue');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ totalRevenue: 1000 });
  });

  it('should handle errors', async () => {
    mockDatabaseService.mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const response = await request(getSalesRouterS).get('/total/revenue');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error Getting Total Revenue' });
  });
});

describe('GET /total/customers', () => {
  it('should return total customers', async () => {
    mockDatabaseService.mockReturnValue({
      getRepository: jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue({
          getCount: jest.fn().mockResolvedValue(50),
        }),
      }),
    });

    const response = await request(getSalesRouter).get('/total/customers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(50);
  });

  it('should handle errors', async () => {
    mockDatabaseService.mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const response = await request(getSalesRouter).get('/total/customers');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error Getting Total Customers' });
  });
});


