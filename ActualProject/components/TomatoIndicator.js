import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const TomatoIndicator = ({ totalSessions, completedSessions }) => {
    // Create an array to hold the opacity for each tomato
    const tomatoOpacityRefs = useRef(
        Array.from({ length: totalSessions }, () => new Animated.Value(1))
    );

    // When the number of completed sessions changes, animate the tomato disappearance
    useEffect(() => {
        if (completedSessions > 0) {
            Animated.timing(tomatoOpacityRefs.current[completedSessions - 1], {
                toValue: 0, // animate to fully transparent
                duration: 500, // milliseconds
                useNativeDriver: true,
            }).start();
        }
    }, [completedSessions]);

    // When the total sessions change, reset the opacity of all tomatoes
    useEffect(() => {
        tomatoOpacityRefs.current.forEach(opacity => opacity.setValue(1));
    }, [totalSessions]);

    return (
        <View style={styles.tomatoIndicatorContainer}>
            {Array.from({ length: totalSessions }).map((_, index) => (
                <Animated.Image
                    key={index}
                    source={require('../tomato.png')} // Make sure this path is correct for your project
                    style={[
                        styles.tomatoIcon,
                        { opacity: tomatoOpacityRefs.current[index] },
                    ]}
                />
            ))}
        </View>
    );
};

export default TomatoIndicator;

const styles = StyleSheet.create({
    tomatoIndicatorContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f7f7f7',
        // backgroundColor: 'yellow',
    },
    tomatoIcon: {
        width: 80,
        height: 80,
        margin: 5,
    },
});
