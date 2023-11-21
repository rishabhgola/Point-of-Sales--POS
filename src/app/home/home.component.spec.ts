import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppCommonService } from '../Service/app-common.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let appCommonService: AppCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [AppCommonService],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    appCommonService = TestBed.inject(AppCommonService);
  });

  it('should set FruitList when fetchFruitList is called', () => {
    // Arrange
    const mockFruitList = [{
      "id": 1,
      "name": "Apple",
      "price": 100,
      "category": "fruits",
      "quantity": 1,
      "description": "This is Apple",
      "image": "https://media.istockphoto.com/id/495878092/photo/red-apple.jpg?b=1&s=612x612&w=0&k=20&c=kx946oMceMjVYSpC8cyhuUMwjzgMdkdthzeMr3OxPiA="
    }];

    spyOn(appCommonService, 'getFruitList').and.returnValue(of(mockFruitList));

    // Act
    component.fetchFruitList();

    // Assert
    expect(appCommonService.FruitList).toEqual(mockFruitList);
  });
});
