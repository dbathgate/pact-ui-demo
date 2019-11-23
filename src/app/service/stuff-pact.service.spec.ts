import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PactWeb, Matchers } from '@pact-foundation/pact-web';
import { Stuff } from '../model/stuff.model';
import { StuffService } from '../service/stuff.service';

describe('StuffServicePact', () => {

    let provider: PactWeb;

    beforeAll((done) => {
        provider = new PactWeb({
            consumer: 'stuff-ui',
            provider: 'stuff-service',
            port: 1235,
            host: 'localhost'
        });

        setTimeout(done, 2000);

        provider.removeInteractions();
    });

    // afterAll((done) => {
    //     provider.finalize()
    //     .then(() => {
    //         done();
    //     }, (err) => {
    //         done.fail(err);
    //     });
    // });

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ],
            providers: [
                StuffService
            ]
        });
    });

      afterEach((done) => {
          provider.verify().then(done, e => done.fail(e));
      });

      describe('getStuff()', () => {
          const expectedStuff: Stuff[] = [
              {
                stuffId: 1,
                field1: 'some stuff',
                field2: 'some more stuff',
                field3: 'stuff'
              }
          ];

          beforeAll((done) => {
            provider.addInteraction({
                state: 'returns a list of stuff',
                uponReceiving: 'a request to GET stuff',
                withRequest: {
                    method: 'GET',
                    path: '/stuff-service/stuff'
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.somethingLike(
                         expectedStuff
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }).then(done, error => done.fail(error));
          });

          it('should get stuff', (done) => {
              const stuffService: StuffService = TestBed.get(StuffService);
              stuffService.getStuff().subscribe((stuff) => {
                  console.log("I GOT HERE");
                  console.log(stuff);
                //   expect(stuff).toEqual(expectedStuff);
                  done();
              }, (error) => {
                  done.fail(error);
              });
          });
      });
})