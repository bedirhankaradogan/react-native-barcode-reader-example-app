import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar, Image, Dimensions, Linking, Vibration, Animated } from 'react-native';

import Camera from 'react-native-camera';

// Config
import Images from './config/Images';
// Config

let window_size = Dimensions.get('window');

export default class BarcodeReader extends Component {

    constructor() {

        super();

        this.state = {
            detail_left: new Animated.Value(window_size.width),
            barcode: {
                type: '',
                data: ''
            }
        }

    }

    componentWillMount() {
        StatusBar.setHidden(true);
    }

    on_barcode_read(e) {
        
        if(this.state.barcode.data == '') {

            Vibration.vibrate(200);

            this.setState({
                barcode: {
                    type: e.type,
                    data: e.data
                }
            });

            Animated.timing(this.state.detail_left, {
                toValue: 0,
                duration: 200
            }).start();

        }

    }

    close_detail() {

        Animated.timing(this.state.detail_left, {
            toValue: window_size.width,
            duration: 200
        }).start(() => {

            this.setState({
                barcode: {
                    type: '',
                    data: ''
                }
            });

        });

    }

    is_data_url(data) {
        return new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$').test(data);
    }

    render_detail_footer() {

        if(this.is_data_url(this.state.barcode.data) == true) {

            return (
                <View style={Styles.detail_footer}>
    
                    <TouchableOpacity activeOpacity={0.7} style={Styles.button} onPress={() => Linking.openURL(this.state.barcode.data)}>
                        <Text style={Styles.button_text}>WANT TO VISIT?</Text>
                    </TouchableOpacity>
                
                </View>
            );

        }else{
            return null;
        }

    }

    render() {

        return (
            <View style={Styles.screen}>

                <Animated.View style={[Styles.detail, { left: this.state.detail_left }]}>

                    <View style={Styles.detail_header}>

                        <TouchableOpacity activeOpacity={0.7} style={Styles.detail_header_icon_wrapper} onPress={this.close_detail.bind(this)}>
                            <Image style={Styles.detail_header_icon} source={Images.icons.back} />
                        </TouchableOpacity>

                        <Text style={Styles.detail_header_text} numberOfLines={1}>{this.state.barcode.type.toUpperCase()}</Text>

                        <View style={Styles.detail_header_icon_wrapper}></View>

                    </View>

                    <ScrollView style={Styles.scrollview}>

                        <View style={Styles.detail_body}>
                            <Text style={Styles.detail_body_text}>{this.state.barcode.data}</Text>
                        </View>

                    </ScrollView>

                    {this.render_detail_footer()}

                </Animated.View>

                <Camera style={Styles.camera} onBarCodeRead={(e) => this.on_barcode_read(e)} ref={cam => this.camera = cam} aspect={Camera.constants.Aspect.fill}>
                    <View style={Styles.camera_frame}></View>
                </Camera>

            </View>
        );
        
    }

}

const Styles = StyleSheet.create({

    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#000000'
    },

    scrollview: {
        flex: 1,
        alignSelf: 'stretch'
    },

    camera: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: window_size.width,
        height: window_size.width,
        zIndex: 5
    },

    camera_frame: {
        flex: 1,
        alignSelf: 'stretch',
        borderColor: 'green',
        borderWidth: 80,
        opacity: 0.5
    },

    detail: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        backgroundColor: '#000000',
        zIndex: 10
    },

    detail_header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 60,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1
    },

    detail_header_icon_wrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60
    },

    detail_header_icon: {
        width: 20,
        height: 20,
        tintColor: '#ffffff'
    },

    detail_header_text: {
        flex: 1,
        fontSize: 25,
        color: '#ffffff',
        textAlign: 'center'
    },

    detail_body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        padding: 20
    },

    detail_body_text: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'left'
    },

    detail_footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 60,
        paddingHorizontal: 20
    },

    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 40,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ffffff' 
    },

    button_text: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center'
    }

});