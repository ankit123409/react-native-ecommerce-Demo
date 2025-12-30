import React, { use, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Platform,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { STRINGS } from '../../../assets/locales';
import { getProductsAPI } from '../../../redux/product/product-thunk';
import { ICONS } from '../../../assets/icons';
import COLORS from '../../../assets/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = {
  id: string;
  brand: string;
  title: string;
  price: string;
  image: string;
};

const SPACING = 16;
const GAP = 12;

const DashboardScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const CARD_WIDTH = useMemo(() => (width - SPACING * 2 - GAP) / 2, [width]);
  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [priceMinInput, setPriceMinInput] = useState<string>('');
  const [priceMaxInput, setPriceMaxInput] = useState<string>('');
  const [appliedPriceRange, setAppliedPriceRange] = useState<{
    min?: number;
    max?: number;
  }>({});
  const paginatedProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount],
  );

  useEffect(() => {
    getProductsAPI().then(setProducts);
  }, []);

  const loadMore = () => {
    if (isLoadingMore) return;
    if (visibleCount >= products.length) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount(prev => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 1000);
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return paginatedProducts.filter(p => {
      const matchesText = `${p.brand} ${p.title}`.toLowerCase().includes(q);
      if (!matchesText) return false;
      const raw =
        typeof p.price === 'number'
          ? p.price
          : Number(String(p.price).replace(/[^0-9.]/g, ''));
      const { min, max } = appliedPriceRange;
      if (min != null && raw < min) return false;
      if (max != null && raw > max) return false;
      return true;
    });
  }, [paginatedProducts, query, appliedPriceRange]);

  const renderItem = ({ item }: { item: Product }) => {
    const fav = !!favorites[item.id];

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ProductScreen', { product: item })}
        style={[styles.card, { width: CARD_WIDTH }]}
      >
        <TouchableOpacity
          onPress={() => setFavorites(s => ({ ...s, [item.id]: !s[item.id] }))}
          style={styles.heartBtn}
        >
      <Image
  source={ICONS.like}
  style={[
    styles.heartIcon,
    { tintColor: fav ? COLORS.danger : COLORS.iconDefault },
  ]}
/>
        </TouchableOpacity>
        

        {/* Image */}
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: item.image }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        {/* Text */}
        <View style={styles.cardBody}>
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.price}>{'$' + item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderSearch = () => {
    return (
      <View style={styles.searchBox}>
        <Image source={ICONS.search} style={styles.searchIcon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={STRINGS.searchPlaceholder}
          placeholderTextColor="#8E8E93"
          style={styles.searchInput}
        />
      </View>
    );
  };
  const openDrawer = () =>  {
    navigation.openDrawer()
          }
  

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => openDrawer()
        }
        >
          <Image source={ICONS.home} style={styles.menuIcon} />
        </TouchableOpacity>
        {renderSearch()}
      </View>

  
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.heading}>{STRINGS.sneakers}</Text>
          <Text style={styles.subText}>
            {filtered.length} {STRINGS.productsFound}
          </Text>
        </View>

        <View style={styles.actions}>
          <Image source={ICONS.updown} style={styles.actionIcon} />
          <TouchableOpacity
            onPress={() => {
                setFilterVisible(true);
            }}
          >
            <Image source={ICONS.fliter} style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ gap: GAP }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          isLoadingMore ? (
            <Text style={{ textAlign: 'center', paddingVertical: 12 }}>
              {STRINGS.loading}
            </Text>
          ) : null
        }
      />
      <Modal
        visible={isFilterVisible}
        animationType="slide"
        onTouchOutside={() => setFilterVisible(false)}
        transparent
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>

          <View style={styles.bottomSheet}>
            <Text style={styles.sheetTitle}>{STRINGS.filterByPrice}</Text>

            <View style={styles.rowInputs}>
              <TextInput
                keyboardType="numeric"
                placeholder={STRINGS.min}
                value={priceMinInput}
                onChangeText={setPriceMinInput}
                style={styles.priceInput}
              />
              <TextInput
                keyboardType="numeric"
                placeholder={STRINGS.max}
                value={priceMaxInput}
                onChangeText={setPriceMaxInput}
                style={styles.priceInput}
              />
            </View>

            <View style={styles.sheetActions}>
              <TouchableOpacity
                onPress={() => {
                  setPriceMinInput('');
                  setPriceMaxInput('');
                  setAppliedPriceRange({});
                  setFilterVisible(false);
                }}
                style={[styles.sheetButton, styles.resetButton]}
              >
                <Text style={styles.resetText}>{STRINGS.reset}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  const min = priceMinInput ? Number(priceMinInput) : undefined;
                  const max = priceMaxInput ? Number(priceMaxInput) : undefined;
                  setAppliedPriceRange({ min, max });
                  setFilterVisible(false);
                }}
                style={[styles.sheetButton, styles.applyButton]}
              >
                <Text style={styles.applyText}>{STRINGS.apply}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
    paddingHorizontal: SPACING,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  menuIcon: {
    width: 24,
    height: 18,
    tintColor: COLORS.iconDefault,
  },

  searchBox: {
    flex: 1,
    height: 44,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.placeholder,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.black,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12,
  },

  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },

  subText: {
    marginTop: 4,
    color: COLORS.textSecondary,
  },

  actions: {
    flexDirection: 'row',
    gap: 14,
  },

  actionIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.iconDefault,
  },

  list: {
    paddingBottom: 24,
    gap: GAP,
  },

  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
  },

  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  heartIcon: {
    width: 20,
    height: 16,
  },

  imageWrap: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 129,
    height: 65,
  },

  cardBody: {
    paddingHorizontal: 12,
    paddingBottom: 14,
  },

  brand: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },

  title: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textMuted,
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
  },

  loadMoreBtn: {
    marginTop: 16,
    marginBottom: 32,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: COLORS.accent,
    borderRadius: 20,
  },

  loadMoreText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },

  /* Modal / Bottom Sheet */

  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: COLORS.textPrimary,
  },

  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },

  priceInput: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 12,
    backgroundColor: COLORS.inputBg,
    color: COLORS.black,
  },

  sheetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  sheetButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  resetButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
    marginRight: 8,
  },

  resetText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },

  applyButton: {
    backgroundColor: COLORS.accent,
    marginLeft: 8,
  },

  applyText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});



export default DashboardScreen;
