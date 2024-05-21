import { Icon, useTheme} from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export interface Props {
    name: string,
    color?:string,
    white?:boolean;
}

export const MyIcon = ({name, color, white = false }:Props) => {

    const theme = useTheme();

    if (white) {
        color = theme['color-info-100'];
    } else if(!white){
        color = theme['text-basic-color'];
    } else {
        color = theme[color!];
    }

  return (
    <Icon name={name} style={styles.icon} fill={color}  />
  )
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height:30
    }
})