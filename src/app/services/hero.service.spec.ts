import { TestBed } from "@angular/core/testing"
import { MessageService } from "./message.service";

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { HeroService } from "./hero.service";


describe("HeroService", () => {

  let messageServiceMock;
  let httpTestingController: HttpTestingController;
  let heroServiceClone: HeroService;

  beforeEach(() => {

    let messageServiceMock = jasmine.createSpyObj(["add"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: messageServiceMock
        }
      ]

    })


    httpTestingController = TestBed.inject(HttpTestingController);
    heroServiceClone = TestBed.inject(HeroService);

  })

  it("Should call getHeroes API through HeroService", () => {

    heroServiceClone.getHero(4).subscribe(
      (resp) => {
        expect(resp.id).toEqual(4);
      },
    )

    let requestSent = httpTestingController.expectOne('api/heroes/4'); // Observe the URL

    requestSent.flush({ // setup a return response
      id: 4,
      name: "Honor",
      strength: 8
    })

    expect(requestSent.request.method).toBe('GET');

    httpTestingController.verify(); // check if the expected request where done

  });
})
