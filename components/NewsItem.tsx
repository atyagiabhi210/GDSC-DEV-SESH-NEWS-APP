import { NewsItemType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const NewsItem = ({ newsItem }: { newsItem: NewsItemType }) => {
  return (
    <Pressable
      onPress={() => {
        Linking.openURL(newsItem.url);
      }}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <ImageBackground
        source={{ uri: newsItem.image_url }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.85)"]}
          locations={[0, 0.5, 1]}
          style={styles.gradient}
        >
          {/* Top Section - Source and Date */}
          <View style={styles.topSection}>
            {newsItem.categories && newsItem.categories.length > 0 && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText} numberOfLines={1}>
                  {newsItem.categories[0]}
                </Text>
              </View>
            )}
            <View style={styles.metaContainer}>
              {newsItem.source && (
                <Text style={styles.sourceText} numberOfLines={1}>
                  {newsItem.source}
                </Text>
              )}
              {newsItem.published_at && (
                <Text style={styles.dateText}>{newsItem.published_at}</Text>
              )}
            </View>
          </View>

          {/* Bottom Section - Title and Description */}
          <View style={styles.bottomSection}>
            <Text style={styles.title} numberOfLines={2}>
              {newsItem.title}
            </Text>
            {newsItem.description && (
              <Text style={styles.description} numberOfLines={2}>
                {newsItem.description}
              </Text>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageBackground: {
    width: "100%",
    height: 240,
  },
  imageStyle: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  categoryBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    maxWidth: "40%",
  },
  categoryText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaContainer: {
    alignItems: "flex-end",
    maxWidth: "55%",
  },
  sourceText: {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  dateText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 11,
    fontWeight: "500",
  },
  bottomSection: {
    marginTop: "auto",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 28,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default NewsItem;
