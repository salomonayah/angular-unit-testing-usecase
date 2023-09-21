import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core"
import { By } from "@angular/platform-browser"
import { of } from "rxjs"
import { HeroesComponent } from "./heroes.component"
import { HeroComponent } from "../hero/hero.component"
import { HeroService } from "../../services/hero.service"


// Shallow testing
describe("HeroesComponent", () => {

  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"])

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: HeroService,
        useValue: mockHeroService
      }]
    })

    fixture = TestBed.createComponent(HeroesComponent)
  });

  it("should make an API call to getHeroes endpoint on Init", () => {

    let heroesList = [
      {
        id: 1,
        name: "Donne",
        strength: 8
      },
      {
        id: 2,
        name: "David",
        strength: 8
      },
      {
        id: 3,
        name: "Honor",
        strength: 8
      },
      {
        id: 4,
        name: "Rosita",
        strength: 8
      }
    ];

    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    expect(fixture.componentInstance.heroes).toEqual(heroesList);
  })


  it("should make an API call to getHeroes endpoint on Init", () => {

    let heroesList = [
      {
        id: 1,
        name: "Donne",
        strength: 8
      },
      {
        id: 2,
        name: "David",
        strength: 8
      },
      {
        id: 3,
        name: "Honor",
        strength: 8
      },
      {
        id: 4,
        name: "Rosita",
        strength: 8
      }
    ];

    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    let debugElements = fixture.debugElement.queryAll(By.directive(HeroComponent))

    expect(debugElements.length).toEqual(4);
    expect(debugElements[0].componentInstance.hero.name).toEqual("Donne");
  })




})
