import React from 'react';

import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_SIZE, hp, MARGIN } from '@src/assets/style/theme';

function TagButton(props) {
  const { data, maxSelect, gIndex, multiColor, colorStyle, onPress } = props;

  let transBackgroundStyles = '';
  let transFontStyles = '';

  transBackgroundStyles = {
    backgroundColor: data.check ? colorStyle.activeBackgroundColor : colorStyle.inActiveBackgroundColor,
  };

  transFontStyles = {
    color: data.check ? colorStyle.activeColor : colorStyle.inActiveColor,
  };

  if (data.disabled) {
    transBackgroundStyles.backgroundColor = COLORS.grey300;
    transFontStyles.color = '#fff';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      disabled={data.disabled}
      onPress={onPress.bind(this, {
        id: data.id,
        name: data.name,
        maxSelect,
        gIndex,
      })}
      style={[styles.button, transBackgroundStyles]}
    >
      <Text
        style={[
          transFontStyles,
          {
            fontWeight: '400',
            fontSize: hp('1.5%'),
          },
        ]}
      >
        {data.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '600',
  },
  listWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: MARGIN.xl,
  },
  button: {
    paddingVertical: MARGIN.xl,
    paddingHorizontal: MARGIN.xl,
    marginTop: MARGIN.md,
    marginRight: MARGIN.md,
    borderRadius: 20,
  },
});

export default TagButton;
