'use client';

import React, { createRef } from 'react';
import ImageEditor from '@toast-ui/react-image-editor';
import { saveAs } from 'file-saver';

import 'tui-image-editor/dist/tui-image-editor.css';
import './custom-image-editor.css';
import { theme } from './theme';
import { ButtonGroup, MODE } from 'baseui/button-group';
import { Button, SHAPE } from 'baseui/button';
import { base64ToBlob } from '@/lib/utils';
import { TrashCanFilled } from 'baseui/icon';

export class CustomImageEditor extends React.Component {
  editorRef = createRef();
  fileInputRef = createRef<HTMLInputElement>();
  state = {
    selectedImageIndex: 0,
    selectedOject: 0,
  };

  editorInstance = () => {
    return (this.editorRef.current as any)?.getInstance();
  }

  downloadImage = () => {
    const dataURL = this.editorInstance().toDataURL();
    let imageName = this.editorInstance().getImageName();

    const blob = base64ToBlob(dataURL);
    const type = blob.type.split('/')[1];
    if (imageName.split('.').pop() !== type) {
      imageName += '.' + type;
    }

    saveAs(blob, imageName);
  }

  loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    this.editorInstance().loadImageFromFile(file);
  }

  onObjectActivated = (obj: any) => {
    this.setState({ selectedOject: obj.id });
  }

  trashObject = () => {
    if (this.state.selectedOject > 0) {
      this.editorInstance().removeObject(this.state.selectedOject);
      this.setState({ selectedObject: 0 });
    }
  }

  render() {
    return (
      <div className="relative h-full">
        {/* <div className="grid justify-items-center grid-rows-13 grid-cols-1 gap-4 h-full"> */}
        {/* <div className='row-span-11 justify-self-stretch'> */}
        <ImageEditor
          ref={this.editorRef}
          includeUI={{
            loadImage: {
              path: 'https://silverstatements.com/cdn/shop/products/il_fullxfull.1093439477_psp0.jpg?v=1643727516',
              name: 'Sample Image'
            },
            theme: theme,
            menu: ['draw', 'shape', 'icon', 'text'],
            menuBarPosition: 'top',
            selectionStyle: {
              borderColor: 'red',
              cornerColor: 'green',
              cornerSize: 6,
              rotatingPointOffset: 100,
              transparentCorners: false,
            }
          }}
          cssMaxHeight={document.documentElement.clientHeight * 0.8}
          cssMaxWidth={document.documentElement.clientHeight * 0.9}
          onObjectActivated={this.onObjectActivated}
        />
        {/* </div> */}

        <div className="absolute bottom-40 left-1/2 -translate-x-1/2">
          <ButtonGroup>
            <Button shape="round" onClick={this.trashObject}>
              <TrashCanFilled />
            </Button>
            <div></div>
          </ButtonGroup>
        </div>

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          {/* <div className='row-span-1'> */}
          <ButtonGroup
            mode={MODE.radio}
            selected={this.state.selectedImageIndex}
            onClick={(_event, index) => {
              this.setState({ selectedImageIndex: index });
            }}
          >
            <Button>앞면</Button>
            <div className="w-8" />
            <Button>뒷면</Button>
          </ButtonGroup>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          {/* <div className='row-span-2'> */}
          <ButtonGroup>
            <Button>상담요청</Button>
            <div className="w-8" />
            <Button onClick={() => this.fileInputRef.current?.click()}>
              디자인파일 직접업로드
            </Button>
            <input
              onChange={this.loadFile}
              multiple={false}
              ref={this.fileInputRef}
              type="file"
              hidden
            />
            <div className="w-8" />
            <Button onClick={this.downloadImage}>주문하기</Button>
          </ButtonGroup>
        </div>
      </div>
    );
      
  }
}