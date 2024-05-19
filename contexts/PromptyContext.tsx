import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { LoginUser } from "@/models/types/loginUser.type";
import { useRouter } from "next/router";
import { apiGetGeneratedMessageCount } from "@/services/api/MessageAPI";
import { apiGetAllConfigs } from "@/services/api/ConfigAPI";
import { Feature, Language, Tone } from "@/models/types/config.types";
import { UseUser } from "./_User";
interface PromptyContextInterface {
  user: LoginUser | null;
  languages: Language[];
  tones: Tone[];
  features: Feature[];
  generatedMessageCount: number;
  changeLanguage: (locale: string) => void;
  updateGeneratedMessageCount: () => Promise<void>;
  handleLogin: (typeLogin: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  getUserData: () => Promise<void>;
}

const PromptyContext = createContext<PromptyContextInterface>({
  user: {} as LoginUser,
  languages: [],
  tones: [],
  features: [],
  generatedMessageCount: 0,
  changeLanguage: () => {},
  updateGeneratedMessageCount: async () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  getUserData: async () => {},
});

interface Props {
  children: ReactNode;
}

export function usePromptyContext() {
  return useContext(PromptyContext);
}

export function PromptyContextProvider({ children }: Props) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [allTones, setAllTones] = useState<Tone[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>("");
  const [tones, setTones] = useState<Tone[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [messageCount, setMessageCount] = useState<number>(0);
  const router = useRouter();
  const { user, handleLogin, handleLogout, getUserData } = UseUser();
  const changeLanguage = (locale: string) => {
    setCurrentLanguage(locale);
    router.push(router.pathname, router.asPath, { locale });
  };

  const getTonesByLanguage = () => {
    const language = languages.find(
      (language) => language.languageName === currentLanguage,
    );
    const tonesByLanguage = allTones.filter(
      (tone) => tone.languageId === language?.id,
    );
    setTones(tonesByLanguage);
  };

  const updateGeneratedMessageCount = async () => {
    const messageCount = await apiGetGeneratedMessageCount();
    setMessageCount(messageCount ? messageCount : 0);
  };

  const fetchData = async () => {
    try {
      const response = await apiGetAllConfigs();
      setLanguages(response.data?.languages!);
      setAllTones(response.data?.tones!);
      setFeatures(response.data?.features!);
      setCurrentLanguage(router.locale ? router.locale : "th");

      const messageCount = await apiGetGeneratedMessageCount();
      setMessageCount(messageCount ? messageCount : 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getTonesByLanguage();
  }, [currentLanguage]);

  const value: PromptyContextInterface = {
    user: user,
    languages: languages,
    tones: tones,
    features: features,
    generatedMessageCount: messageCount,
    changeLanguage: changeLanguage,
    updateGeneratedMessageCount: updateGeneratedMessageCount,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getUserData: getUserData
  };
  return (
    <PromptyContext.Provider value={value}>{children}</PromptyContext.Provider>
  );
}
