//@flow
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PDFView from 'react-native-view-pdf';

type PdfViewComponentProps = {
  PdfData: string,
};
type PdfViewComponentState = {};

class PdfViewComponent extends Component<
  PdfViewComponentProps,
  PdfViewComponentState,
> {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <PDFView
        style={{flex: 1}}
        onError={error => console.log('onError', error)}
        onLoad={() => console.log('PDF rendered from base 64 dataSignIn')}
        resource={this.props.PdfData}
        resourceType={'base64'}
      />
    );
  }
};


export default PdfViewComponent;
