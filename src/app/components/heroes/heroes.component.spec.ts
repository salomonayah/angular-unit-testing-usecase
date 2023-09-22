import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core"
import { By } from "@angular/platform-browser"
import { of } from "rxjs"
import { HeroesComponent } from "./heroes.component"
import { HeroComponent } from "../hero/hero.component"
import { HeroService } from "../../services/hero.service"

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;

  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

// Shallow testing
describe("HeroesComponent", () => {

  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"])
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub
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

    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    expect(fixture.componentInstance.heroes).toEqual(heroesList);
  })


  it("should display a list of Heroes in the template on Init", () => {

    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    let debugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(debugElements.length).toBe(4);
    expect(debugElements[3].componentInstance.hero.name).toEqual("Rosita");
  })


  it("Should delete element when user click on delete button", () => {

    spyOn(fixture.componentInstance, "delete");

    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    let debugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    let buttonIdentifier = debugElements[0].query(By.css("button"));

    buttonIdentifier.triggerEventHandler('click', { stopPropagation: () => { } });
    (<HeroComponent>debugElements[0].componentInstance).delete.emit(heroesList[0]);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroesList[0]);

  })


  it("Should delete element and emit event", () => {

    spyOn(fixture.componentInstance, "delete");

    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    let debugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>debugElements[0].componentInstance).delete.emit(heroesList[0]); // emit event


    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroesList[0]);

  })



  it('should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    const name = "Mr. Ice";

    mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4 }));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;

    addButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;

    expect(heroText).toContain(name);
  })


  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    let routerLink = heroComponents[0]
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  })


})
