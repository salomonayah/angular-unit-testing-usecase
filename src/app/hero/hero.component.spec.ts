import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"



// Shallow testing
describe("HeroComponent", () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(HeroComponent);


  })

  it("should receive HERO like input", () => {
    fixture.componentInstance.hero = {
      id: 2,
      name: "Honor",
      strength: 8
    }

    expect(fixture.componentInstance.hero.name).toBe("Honor");
  })

})
