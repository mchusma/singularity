import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button } from "react-native";
import { RootState, persistor } from "../store/store";
import { styles } from "./styles";
import { resetGame } from "../store/logSlice";
import FormattedNumber from "./formattedNumber";

interface Log {
  id: number;
  message: string;
}

function ActiveLogs() {
  const dispatch = useDispatch();
  const logs = useSelector((state: RootState) => state.logs.logs);
  console.log("Logs:", logs);

  return (
    <View style={styles.resourceWrapper}>
      <Text style={styles.text}>Log</Text>
      {logs?.length > 0
        ? logs.map((log: Log) => (
            <Text key={log.id} style={styles.text}>
              {log.message}
            </Text>
          ))
        : null}
      <Button
        title="Reset Log"
        onPress={() => {
          persistor.purge().then(() => {
            dispatch(resetGame());
          });
        }}
      />
    </View>
  );
}

export default ActiveLogs;
