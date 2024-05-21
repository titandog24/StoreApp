import { Button } from "@ui-kitten/components"
import { MyIcon } from "./MyIcon"
import { StyleProp, ViewStyle } from "react-native"

interface Props {
    style?: StyleProp<ViewStyle>,
    iconName?: string,
    onPress: () => void
}

export const FAB = ({style, iconName = 'plus-outline', onPress}:Props) => {
  return (
    <Button style={[{
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 3,
        borderRadius: 13
    }, style]}
    accessoryLeft={<MyIcon name={iconName} white />} 
    onPress={onPress}
    />
  )
}
