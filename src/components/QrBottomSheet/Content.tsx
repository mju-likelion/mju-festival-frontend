import QRCode from 'qrcode.react';

import { BottomSheetPropTypes } from '../../types';

const Content = ({ qrCode }: BottomSheetPropTypes) => {
  return <div>{qrCode && <QRCode value={qrCode} />}</div>;
};

export default Content;
