import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { By } from "@angular/platform-browser"



// Shallow testing
describe("HeroComponent", () => {

  let fixture: ComponentFixture<HeroComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(HeroComponent)


  })

  it("should receive HERO like input", () => {
    fixture.componentInstance.hero = {
      id: 2,
      name: "Honor",
      strength: 8
    }

    expect(fixture.componentInstance.hero.name).toBe("Honor")
  })



  it("should write hero.name in the template", () => {
    fixture.componentInstance.hero = {
      id: 2,
      name: "Honor",
      strength: 8
    }

    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('a').textContent).toContain("Honor")
  })


  it("should write rank with id in the template", () => {
    fixture.componentInstance.hero = {
      id: 2,
      name: "Honor",
      strength: 8
    }

    fixture.detectChanges()

    // access template using debugElement
    let debugTemplateElement = fixture.debugElement.query(By.css('a'))

    expect(debugTemplateElement.nativeElement.textContent).toContain(2);
  })

})
