/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Modal as ReactModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_SIZE, hp, MARGIN, SPACING, wp } from '@src/assets/style/theme';

function Modal({ modalVisible, renderComponent, confirm, _deny, _permission, title, subTitle, denyText, permissionText }) {
  const RenderComponent = renderComponent;
  const resPermissionText = permissionText || '확인';

  return (
    <ReactModal animationType="fade" transparent={true} visible={modalVisible}>
      {confirm ? (
        <View style={styles.overLay}>
          <View style={styles.modalBox}>
            <View style={styles.content}>
              <Text style={styles.contentText}>{title}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  color: COLORS.lightBlack,
                  textAlign: 'center',
                  lineHeight: 20,
                }}
              >
                {subTitle}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: MARGIN.md,
              }}
            >
              {denyText && (
                <Pressable onPress={_deny} style={[styles.confirmButton, { backgroundColor: COLORS.grey300 }]}>
                  <Text style={{ color: COLORS.lightBlack }}>{denyText}</Text>
                </Pressable>
              )}
              <Pressable style={[styles.confirmButton, { flex: 0.85 }]} onPress={_permission}>
                <Text style={{ color: '#fff' }}>{resPermissionText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <RenderComponent />
      )}
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  textButton: {
    fontSize: FONT_SIZE.gd2,
    color: '#fff',
  },
  customBtn: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 25,
    shadowColor: '#4e4f72',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.3,
    elevation: 5,
  },
  ticketBtn: {
    padding: SPACING.gd,
    width: '95%',
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  btn: {
    padding: SPACING.gd,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  etcs: {
    backgroundColor: COLORS.grey200,
    width: 34,
    height: 5,
    position: 'absolute',
    top: 10,
    borderRadius: 100,
  },
  bottomModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.layout,
  },

  overLay: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.50)',
  },
  modalBox: {
    width: wp('80%'),
    height: hp('25%'),
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {},
  contentText: {
    fontSize: FONT_SIZE.gd3,
    marginBottom: MARGIN.sm,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  confirmText: {
    alignSelf: 'baseline',
    backgroundColor: '#000',
    width: 300,
    flex: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 126,
    height: 41,
    marginHorizontal: 4,
  },
  btnWrap: { justifyContent: 'space-between' },
});

export default Modal;
