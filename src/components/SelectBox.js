import commonStyles from '@src/assets/style/common';
import { COLORS, FONT_SIZE, MARGIN, wp } from '@src/assets/style/theme';
import React from 'react';
import { Platform } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// IOS
// const PickerItem = Picker.Item;

// Android
// import RNPickerSelect from 'react-native-picker-select';

function SelectBox({ list, placeholder, selectedValue, onValueChange, style, textColor = '#fff' }) {
  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      <RNPickerSelect
        items={list}
        placeholder={placeholder}
        onValueChange={(value) => console.log(value)}
        onDonePress={() => {
          console.log(`확인누를`);
        }}
        style={{
          placeholder: { color: COLORS.grey800, backgroundColor: COLORS.grey50 },
          inputIOS: {
            ...commonStyles.selectBox,
            backgroundColor: COLORS.grey800,
            color: '#fff',
          },
          inputAndroid: {
            ...commonStyles.selectBox,
            backgroundColor: COLORS.grey800,
            color: '#fff',
          },
          inputIOSContainer: {
            marginTop: MARGIN.sm,
            width: wp('30%'),
            justifyContent: 'center',
          },
          inputAndroidContainer: {
            marginTop: MARGIN.sm,
            width: wp('30%'),
            justifyContent: 'center',
          },
        }}
        fixAndroidTouchableBug={true}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <AntDesign name="down" size={16} color={COLORS.grey400} style={{ marginRight: MARGIN.xxxl, marginTop: MARGIN.md }} />;
        }}
      />
    </React.Fragment>
  );
}

export default SelectBox;
