import { ReactNative as RN, stylesheet, lodash } from "@metro/common";
import { TableRow, TableRowGroup, TableSwitchRow } from "@metro/common/components";
import { storage } from "@vendetta/plugin";

export default function Settings() {
    return (
        <RN.ScrollView style={{ flex: 1 }}>
            <TableRowGroup title="Hide buttons">
                <TableSwitchRow
                    label="Hide Add Friend"
                    subLabel="Hide the Add Friend button from profiles"
                    value={storage.hideAddFriend ?? true}
                    onValueChange={(value) => {
                        storage.hideAddFriend = value;
                    }}
                />

                <TableSwitchRow
                    label="Hide Voice Call"
                    subLabel="Hide voice call buttons"
                    value={storage.upHideVoiceButton ?? true}
                    onValueChange={(value) => {
                        storage.upHideVoiceButton = value;
                    }}
                />

                <TableSwitchRow
                    label="Hide Video Call"
                    subLabel="Hide video call buttons"
                    value={storage.upHideVideoButton ?? true}
                    onValueChange={(value) => {
                        storage.upHideVideoButton = value;
                    }}
                />

                <TableSwitchRow
                    label="Hide DM Call"
                    subLabel="Hide call buttons in DMs"
                    value={storage.dmHideCallButton ?? true}
                    onValueChange={(value) => {
                        storage.dmHideCallButton = value;
                    }}
                />

                <TableSwitchRow
                    label="Hide DM Video"
                    subLabel="Hide video buttons in DMs"
                    value={storage.dmHideVideoButton ?? true}
                    onValueChange={(value) => {
                        storage.dmHideVideoButton = value;
                    }}
                />

                <TableSwitchRow
                    label="Hide VC Video"
                    subLabel="Hide video button in voice channels"
                    value={storage.hideVCVideoButton ?? true}
                    onValueChange={(value) => {
                        storage.hideVCVideoButton = value;
                    }}
                />
            </TableRowGroup>
        </RN.ScrollView>
    );
}
