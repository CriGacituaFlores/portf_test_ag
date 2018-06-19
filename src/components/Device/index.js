import React from 'react';
import Sensor from 'material-ui/svg-icons/device/wifi-tethering';

const Device = ({ device }) => (
  <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: 8 }}>
    <div style={{ width: '90%' }}>
      <p>{device.name}</p>
    </div>
    <div>
      <Sensor color="#bbcb32" />
    </div>
  </div>
);

export default Device;
