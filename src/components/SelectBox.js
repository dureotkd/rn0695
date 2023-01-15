import React from 'react';
import { Platform } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
// IOS
// const PickerItem = Picker.Item;

// Android
// import RNPickerSelect from 'react-native-picker-select';

function SelectBox({ list, selectedValue, onValueChange, style, textColor = '#fff' }) {
  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      {/* <Picker textColor={textColor} style={{ ...style }} onValueChange={onValueChange} selectedValue={selectedValue}>
        {list.map((value, i) => (Picker
          <PickerItem label={value} value={i} key={i} />
        ))}
      </Picker> */}
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: '전체', value: '전체' },
          { label: '진행중', value: '진행중' },
          { label: '마감', value: '마감' },
        ]}
      />
    </React.Fragment>
  );
}

export default SelectBox;
