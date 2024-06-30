import { useState } from "react";
import { Command } from 'cmdk'
import { IoMdSearch } from "react-icons/io";
import { IoMdOpen } from "react-icons/io";
import { IoMdGlobe } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";
import ultravioletLogo from "../assets/ultravioletLogo.png";
import rammerheadLogo from "../assets/rammerheadLogo.png";

function showMenu() {
    let cmdkList = document.querySelector("[cmdk-list]") as HTMLElement
    let cmdkRoot = window.document.querySelector("[cmdk-root]") as HTMLElement
    cmdkList.scroll({ top: 0 })
    cmdkRoot.dataset.open = "true"
}

const CommandMenu = () => {
    const [pages, setPages] = useState<string[]>([])
    const page = pages[pages.length - 1]

    function menuBack() {
        setPages((pages) => pages.slice(0, -1))
    }

    function openMenu(page: string) {
        setPages([...pages, page])
    }

    return (
        <Command onKeyDown={(e) => {
            if (e.key === "Escape") {
                e.preventDefault()
                menuBack()
            }
        }}
            shouldFilter={false}
            label="Menu"
            data-open="false"
        >
            <div cmdk-input-wrapper="" data-back={page ? "true" : "false"}>
                <div cmdk-back="" onClick={menuBack}>
                    <MdChevronLeft />
                </div>
                <Command.Input autoFocus placeholder="Search or Enter URL" onValueChange={showMenu} onClick={showMenu} />
            </div>
            <Command.List>
                <Command.Empty>No results found.</Command.Empty>

                {!page && (
                    <>
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
                            <Command.Item onSelect={() => openMenu("proxy")}>
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
                    </>
                )}
                {page === "proxy" && (
                    <>
                        <Command.Group heading="Proxy">
                            <Command.Item>
                                <img src={ultravioletLogo} draggable={false} />
                                Ultraviolet
                            </Command.Item>
                            <Command.Item>
                                <img src={rammerheadLogo} draggable={false} />
                                Rammerhead
                            </Command.Item>
                        </Command.Group>
                    </>
                )}
            </Command.List>

        </Command>
    )
}

export { CommandMenu };