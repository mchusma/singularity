import React from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { RootState } from "../store/store";
import { styles } from "./styles";

interface Log {
  id: number;
  message: string;
}

function ActiveLogs() {
  const logs = useSelector((state: RootState) => state.logs.logs);

  console.log("Logs:", logs);

  return (
    <View>
        {logs?.length > 0
          ? logs.map((log: Log) => (
              <View style={styles.logContainer} key={log.id}>
                <Text style={styles.text}>
                  {log.message}
                </Text>
              </View>
            ))
          : null}
    </View>
  );
}

export default ActiveLogs;