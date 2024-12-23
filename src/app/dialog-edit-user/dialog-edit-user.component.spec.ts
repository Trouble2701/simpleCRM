import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {  }, paramMap: { get: function(key){ return 'abc'; }} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserComponent, RouterModule.forRoot([])],
      providers:[{provide: ActivatedRoute, useValue: fakeActivatedRoute}, Firestore]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
