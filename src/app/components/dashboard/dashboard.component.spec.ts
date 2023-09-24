import { ComponentFixture, TestBed } from "@angular/core/testing"
import { DashboardComponent } from "./dashboard.component"
import { HeroService } from "../../services/hero.service"
import { HeroSearchComponent } from "../hero-search/hero-search.component";
import { of } from "rxjs";
import { StrengthPipe } from "../../strength/strength.pipe";
import { Directive, Input } from "@angular/core";


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


describe("Dashboard Component", () => {
  let mockHeroService;
  let fixture: ComponentFixture<DashboardComponent>;
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
    },
    {
      id: 5,
      name: "Papa",
      strength: 8
    }
  ];

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj(["getHeroes"]);

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroSearchComponent,
        StrengthPipe,
        RouterLinkDirectiveStub
      ],
      imports: [],
      providers: [{
        provide: HeroService,
        useValue: mockHeroService
      }]
    })



    fixture = TestBed.createComponent(DashboardComponent);

  })

  it("Should load list of Heroes on Init", () => {


    mockHeroService.getHeroes.and.returnValue(of(heroesList));

    fixture.detectChanges();

    let expectation = heroesList.slice(1, 5);

    expect(fixture.componentInstance.heroes).toEqual(expectation);

  })

})
