import { AlertCloseableComponent } from './alert-closeable.component';

describe('AlertCloseableComponent', () => {

  let alertClosaebleComponent: AlertCloseableComponent;

  beforeEach(() => {
    alertClosaebleComponent = new AlertCloseableComponent();
  });

  it('should set isClosed false when reOpenAlert()', () => {
    alertClosaebleComponent.reOpenAlert();
    const result = alertClosaebleComponent.isClosed;
    expect(result).toBe(false);
  });

  it('should set isClose true when closeAlert()', () => {
    alertClosaebleComponent.closeAlert();
    const result = alertClosaebleComponent.isClosed;
    expect(result).toBe(true);
  });
});
