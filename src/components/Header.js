import { useEffect, useRef, useState } from "react";
import styles from "../styles/components/Header.module.css";
import { Search } from "./Search";

export default function Header({ use }) {
  const [current, setCurrent] = useState(null);
  const [activeMenu, setActiveMenu] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [menuRef, searchRef, dropDownRef] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const items = [
    ["/leadboard", "LEADBOARD"],
    ["/soccer", "JOGOS"],
    ["/leagues", "LIGAS"],
    ["/rules", "REGRAS"],
    ["/account", "CONTA"],
  ];

  useEffect(() => {
    setCurrent(window.location.pathname);
    dynamicListener({
      menu: menuRef.current,
      search: searchRef.current,
      dropdown: dropDownRef.current,
      setShowButton,
    });

    document.addEventListener("click", ({ target }) => {
      if (!dropDownRef.current.contains(target)) {
        setActiveMenu(false);
      }
    });
  }, []);

  const itemsList = items.map(([href, name], index) => {
    const imCurrent = current === href;
    if (use?.includes(href) || use === "all")
      return (
        <li
          className={(imCurrent && styles.current) || null}
          key={name + index}
        >
          <a href={(!imCurrent && href) || null}>{name}</a>
        </li>
      );
    return null;
  });

  return (
    <header className={styles.container}>
      <div className={styles.headerContent}>
        <div className={styles.userProfile}>
          <img src="/icons/user.svg" alt="user-profile" />
          <span>36 PONTOS</span>
        </div>
        <span className={styles.separator} />
        <div ref={menuRef} className={styles.itemsList}>
          <ul>{itemsList}</ul>
          <div
            ref={dropDownRef}
            className={`${styles.dropdown} ${styles[activeMenu && "active"]} ${
              styles[showButton && "show"]
            }`}
          >
            <button
              onClick={() => {
                setActiveMenu(!activeMenu);
              }}
            >
              <img src="/icons/menu.svg" alt="..." />
            </button>

            <div className={styles.dropdownContent}></div>
          </div>
        </div>
      </div>

      <Search
        searchRef={searchRef}
        onChange={() => {
          updateDynamicMenu({
            menu: menuRef.current,
            search: searchRef.current,
            dropdown: dropDownRef.current,
            setShowButton,
          });
        }}
      />
    </header>
  );
}

function dynamicListener({ menu, search, dropdown, setShowButton }) {
  const preCkeckItems = [].slice.call(menu?.childNodes[0]?.children);
  if (!preCkeckItems) return;

  updateDynamicMenu({ menu, search, dropdown, setShowButton });

  return window.addEventListener("resize", () => {
    updateDynamicMenu({ menu, search, dropdown, setShowButton });
  });
}

function updateDynamicMenu({ menu, search, dropdown, setShowButton }) {
  const items = [].slice.call(menu?.childNodes[0]?.children);
  const menuItems = [].slice.call(dropdown?.childNodes[1]?.children);

  if (!items) return;
  const windowRect = { right: window.innerWidth, bottom: window.innerHeight };
  const dropdownRect = dropdown.childNodes[0].getBoundingClientRect();
  const searchRect = search.getBoundingClientRect();

  const overflowItem = items
    .filter(({ classList }) => !classList.contains(styles.overflow))
    .slice(-1)[0];

  if (searchRect.right >= windowRect.right && overflowItem) {
    dropdown.childNodes[1].appendChild(overflowItem);
    setTimeout(() => {
      updateDynamicMenu({ menu, search, dropdown, setShowButton });
    }, 10);

    if (dropdown.childNodes[1].children.length > 0) {
      setShowButton(true);
    }
  }

  if (!menuItems || menuItems.length === 0) return;
  const lastMenuItem = menuItems.slice(-1)[0];
  const lastMenuItemRect = lastMenuItem.getBoundingClientRect();

  if (searchRect.left - dropdownRect.right >= lastMenuItemRect.width) {
    menu.childNodes[0].appendChild(lastMenuItem);
    if (dropdown.childNodes[1].children.length === 0) {
      setShowButton(false);
    }
    setTimeout(() => {
      updateDynamicMenu({ menu, search, dropdown, setShowButton });
    }, 10);
  }
}
