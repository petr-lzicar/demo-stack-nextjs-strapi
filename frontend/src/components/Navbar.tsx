// components/Navbar.js
import Link from 'next/link';

// Definice typů pro navigační položky
type NavigationItem = {
    id: number;
    documentId: string;
    title: string;
    menuAttached: boolean;
    order: number;
    path: string;
    type: string;
    uiRouterKey: string;
    slug: string;
    related: {
        documentId: string;
        __type: string;
        content: Array<{
            type: string;
            children: Array<{
                type: string;
                text: string;
            }>;
        }>;
        slug: string;
        title: string;
    };
    items: NavigationItem[];
    collapsed: boolean;
    additionalFields: Record<string, any>;
};

export default async function Navbar({ items, locale }: { items: NavigationItem[], locale: string }) {
    return (
        <nav className="main-navigation">
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <Link href={item.path} >
                            {item.title}
                        </Link>
                        {item.items && item.items.length > 0 && (
                            <ul className="submenu">
                                {item.items.map((subItem) => (
                                    <li key={subItem.id}>
                                        <Link href={subItem.path} >
                                            {subItem.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}