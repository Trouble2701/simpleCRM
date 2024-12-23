import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditContactComponent } from './dialog-edit-contact.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

describe('DialogEditContactComponent', () => {
  let component: DialogEditContactComponent;
  let fixture: ComponentFixture<DialogEditContactComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {  }, paramMap: { get: function(key){ return 'abc'; }} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditContactComponent, RouterModule.forRoot([])],
      providers:[{provide: ActivatedRoute, useValue: fakeActivatedRoute}, Firestore]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
