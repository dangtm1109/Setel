import * as supertest from "supertest";
import payment from './payment'

describe('payment', () => {
  it('works', () =>
    supertest(payment)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
  )
})