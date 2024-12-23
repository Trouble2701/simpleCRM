import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAdressComponent } from './dialog-edit-adress.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

describe('DialogEditAdressComponent', () => {
  let component: DialogEditAdressComponent;
  let fixture: ComponentFixture<DialogEditAdressComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {  }, paramMap: { get: function(key){ return 'abc'; }} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditAdressComponent, RouterModule.forRoot([])],
      providers:[{provide: ActivatedRoute, useValue: fakeActivatedRoute}, Firestore]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
