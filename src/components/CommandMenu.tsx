import { Command } from 'cmdk'
import { IoMdSearch } from "react-icons/io";
import { IoMdOpen } from "react-icons/io";
import { IoMdGlobe } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

const CommandMenu = () => {
    return (
        <Command label="Command Menu" data-open="false">
            <Command.Input autoFocus placeholder="Search or Enter URL..." />
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>

                <Command.Group heading="Actions">
                    <Command.Item>
                        <IoMdSearch />
                        Search
                    </Command.Item>
                    <Command.Item>
                        <IoMdOpen />
                        Open URL
                    </Command.Item>
                </Command.Group>
                <Command.Group heading="Recent">
                    <Command.Item>
                        <IoMdGlobe />
                        https://example.com
                    </Command.Item>
                    <Command.Item>
                        <IoMdGlobe />
                        https://www.google.com
                    </Command.Item>
                    <Command.Item>
                        <IoMdGlobe />
                        https://discord.gg/unblock
                    </Command.Item>
                </Command.Group>
                <Command.Group heading="Settings">
                    <Command.Item>
                        <IoMdSettings />
                        Proxy
                    </Command.Item>
                    <Command.Item>
                        <IoMdSettings />
                        Search Engine
                    </Command.Item>
                    <Command.Item>
                        <IoMdSettings />
                        Theme
                    </Command.Item>
                    <Command.Item>
                        <IoMdSettings />
                        Tab Mask
                    </Command.Item>
                </Command.Group>
            </Command.List>
        </Command>
    )
}

export { CommandMenu };