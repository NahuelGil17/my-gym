import { render } from '@testing-library/angular';
import { FileCardComponent } from './file-card.component';
import { ByteToSizePipe } from '@shared/pipes/byte-to-size.pipe';

describe('FileCardComponent', () => {
  it('should render component', async () => {
    const { container } = await render(FileCardComponent, {
      declarations: [ByteToSizePipe],
      componentInputs: {
        file: {
          name: 'file',
          size: 234
        }
      }
    });
    expect(container).toBeTruthy();
  });
});
