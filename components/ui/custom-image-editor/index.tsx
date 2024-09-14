import 'tui-image-editor/dist/tui-image-editor.css';
import './custom-image-editor.css';
import { theme } from './theme';

import ImageEditor from '@toast-ui/react-image-editor';

export const CustomImageEditor = () => {
  return (
    <ImageEditor
      includeUI={{
        theme: theme,
      }}
      cssMaxHeight={document.documentElement.clientHeight}
      cssMaxWidth={document.documentElement.clientHeight}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70
      }}
    />
  );
};
