import { useState } from "react";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Invoices } from "./components/Invoices";
import { Expenses } from "./components/Expenses";
import { VATReports } from "./components/VATReports";
import { GovernmentPortal } from "./components/GovernmentPortal";
import { CalculationCenter } from "./components/CalculationCenter";
import { Journal } from "./components/Journal";
import { Ledger } from "./components/Ledger";
import { Sales } from "./components/Sales";
import { Purchase } from "./components/Purchase";
import { CashReceipt } from "./components/CashReceipt";
import { BankStatement } from "./components/BankStatement";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Calculator,
  Building2,
  Receipt,
  LogOut,
  User,
  Home,
  FolderOpen,
  BookOpen,
  PieChart,
  ShoppingCart,
  Package,
  Banknote,
  Landmark,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "./components/ui/button";

const sidebarSections = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    icon: FolderOpen,
    items: [
      { id: "journal", label: "Journal", icon: BookOpen },
      { id: "ledger", label: "Ledger", icon: PieChart },
      { id: "vat-reports", label: "VAT", icon: Receipt },
      { id: "sales", label: "Sales", icon: ShoppingCart },
      { id: "purchase", label: "Purchase", icon: Package },
      {
        id: "cash-receipt",
        label: "Cash Receipt",
        icon: Banknote,
      },
      {
        id: "bank-statement",
        label: "Bank Statement",
        icon: Landmark,
      },
    ],
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: CreditCard,
    items: [
      { id: "invoices", label: "Invoices", icon: FileText },
      { id: "expenses", label: "Expenses", icon: CreditCard },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Calculator,
    items: [
      {
        id: "calculations",
        label: "Tax Calculator",
        icon: Calculator,
      },
      {
        id: "government",
        label: "Government Portal",
        icon: Building2,
      },
    ],
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [expandedSections, setExpandedSections] = useState<
    string[]
  >(["home", "account"]);

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    setActiveTab("dashboard");
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "invoices":
        return <Invoices />;
      case "expenses":
        return <Expenses />;
      case "vat-reports":
        return <VATReports />;
      case "calculations":
        return <CalculationCenter />;
      case "government":
        return <GovernmentPortal />;
      case "journal":
        return <Journal />;
      case "ledger":
        return <Ledger />;
      case "sales":
        return <Sales />;
      case "purchase":
        return <Purchase />;
      case "cash-receipt":
        return <CashReceipt />;
      case "bank-statement":
        return <BankStatement />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="p-6 border-b">
          <h1 className="text-xl font-medium">BazzarHisab</h1>
          <p className="text-sm text-muted-foreground mt-1">
            नेपाली लेखा प्रणाली
          </p>
        </div>
        <nav className="p-4 flex-1">
          <div className="space-y-1">
            {sidebarSections.map((section) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedSections.includes(
                section.id,
              );

              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors hover:bg-accent text-foreground"
                  >
                    <SectionIcon className="h-4 w-4" />
                    <span className="flex-1">
                      {section.label}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {section.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() =>
                              setActiveTab(item.id)
                            }
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                              activeTab === item.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent text-foreground"
                            }`}
                          >
                            <ItemIcon className="h-4 w-4" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">
              {currentUser}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
