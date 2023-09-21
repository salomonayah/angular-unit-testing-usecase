import { TestBed } from "@angular/core/testing"
import { MessageService } from "./message.service";

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"


describe("HeroService", () => {

  let messageServiceMock;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    let messageServiceMock = jasmine.createSpyObj(["add"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MessageService,
          useValue: messageServiceMock
        }
      ]

    })


    httpTestingController = TestBed.inject(HttpTestingController);
    let msgService = TestBed.inject(MessageService);

  })

  xit("", () => {

    //msgService.

  })


})
