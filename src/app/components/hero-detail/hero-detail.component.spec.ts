import { TestBed, fakeAsync, flush, tick, waitForAsync } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../../services/hero.service";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";


describe('HeroDetailComponent', () => {

  let fixture, mockActivatedRoute, mockHeroService, mockLocation;
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


    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; } } }
    }

    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);

    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);


    mockHeroService.getHero.and.returnValue(of({
      id: 3,
      name: "Honor",
      strength: 8
    }));

  })



  it('should render hero name in a h2 tag', () => {

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('HONOR');

  });


  it('should call updateHero when save is called', fakeAsync(() => {

    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.detectChanges();

    fixture.componentInstance.save();

    // tick(250);
    flush(); //tick and flush allow us to wait a bit but flush is recommended

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }))

  it('should call updateHero when savingWithPromise is called', waitForAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));

    fixture.detectChanges();

    fixture.componentInstance.savingWithPromise();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    })
  }))

})
