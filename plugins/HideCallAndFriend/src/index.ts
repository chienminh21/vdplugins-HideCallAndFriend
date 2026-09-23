import { find, findByName, findByProps } from "@vendetta/metro";
import { after, instead } from "@vendetta/patcher";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import Settings from "./settings";

const patches: (() => void)[] = [];

function enabled(key: string) {
    return storage[key] !== false;
}

function isAddFriend(button: any): boolean {
    const values = [
        button?.accessibilityLabel,
        button?.label,
        button?.text,
        button?.props?.accessibilityLabel,
        button?.props?.label,
        button?.props?.text,
    ];

    return values.some(
        (v) => typeof v === "string" && v.toLowerCase().includes("add friend")
    );
}

function removeButtons(buttons: any[]) {
    if (!Array.isArray(buttons)) return buttons;

    return buttons.filter((button) => {
        if (enabled("hideAddFriend") && isAddFriend(button)) return false;
        return true;
    });
}

export default {
    onLoad() {
        storage.hideAddFriend ??= true;
        storage.upHideVoiceButton ??= true;
        storage.upHideVideoButton ??= true;
        storage.dmHideCallButton ??= true;
        storage.dmHideVideoButton ??= true;
        storage.hideVCVideoButton ??= true;

        const UserProfileActions = findByName("UserProfileActions", false);
        if (UserProfileActions) {
            patches.push(after("default", UserProfileActions, (_, ret) => {
                if (!ret?.props?.children) return ret;

                if (storage.hideAddFriend) {
                    ret.props.children = removeButtons(ret.props.children);
                }

                return ret;
            }));
        }

        const ProfileButtons =
            findByName("SimplifiedUserProfileContactButtons", false) ??
            findByName("UserProfileContactButtons", false);

        if (ProfileButtons) {
            patches.push(after("default", ProfileButtons, (_, ret) => {
                if (!ret?.props?.children) return ret;

                if (storage.hideAddFriend) {
                    ret.props.children = removeButtons(ret.props.children);
                }

                return ret;
            }));
        }

        const PrivateChannelButtons = findByName("PrivateChannelButtons", false);
        if (PrivateChannelButtons) {
            patches.push(after("default", PrivateChannelButtons, (_, ret) => {
                if (!ret?.props?.children) return ret;

                ret.props.children = removeButtons(ret.props.children);
                return ret;
            }));
        }

        const ChannelButtons = findByName("ChannelButtons", false);
        if (ChannelButtons) {
            patches.push(after("default", ChannelButtons, (_, ret) => {
                if (!ret?.props?.children) return ret;

                ret.props.children = removeButtons(ret.props.children);
                return ret;
            }));
        }
    },

    onUnload() {
        patches.forEach((unpatch) => unpatch());
        patches.length = 0;
    },

    settings: Settings,
};
