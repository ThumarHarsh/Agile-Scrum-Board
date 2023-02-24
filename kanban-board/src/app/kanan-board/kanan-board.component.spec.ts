import { TestBed } from '@angular/core/testing';
import { KananBoard } from './kanan-board.component';

describe('KananBoard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        KananBoard
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(KananBoard);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'kanban-board'`, () => {
    const fixture = TestBed.createComponent(KananBoard);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kanban-board');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(KananBoard);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('kanban-board app is running!');
  });
});
