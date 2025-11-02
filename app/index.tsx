import NewsItem from "@/components/NewsItem";
import { fetchTopNews } from "@/hooks/api/news-api";
import { NewsItemType } from "@/types";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

const HomeScreen = () => {
  const [data, setData] = useState<NewsItemType[]>([]);
  useEffect(() => {
    const fetchNews = async () => {
      const data = await fetchTopNews();
      setData(data);
    };
    fetchNews();
  }, []);
  return (
    // parent
    <SafeAreaView
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {"SASSY NEWS APP"}
      </Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <NewsItem newsItem={item} />}
        keyExtractor={(item) => item.uuid}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
