import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decrementQty,
  incrementQty,
} from '../../../redux/actions/cartActions';
import { Dispatch } from 'redux';
import { CartActionTypes } from '../../../redux/types/cartTypes';
import { RootState } from '../../../redux/reducers';
import { useNavigation } from '@react-navigation/native';
import { ICONS } from '../../../assets';
import COLORS from '../../../assets/colors';
import { STRINGS } from '../../../assets/locales';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
type Props = { route: { params: { product: any } } };

const ProductScreen: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch<Dispatch<CartActionTypes>>();
  const { product } = route.params;
  const navigation = useNavigation<any>();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(item => item?.id === product?.id),
  );
  const images = Array.from({ length: 10 }, () => product.image);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [rating, setRating] = useState(Math.floor(product.rating.rate));
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageOverlay}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={styles.backButtonWrap}
          >
            <Image
              source={ICONS.backarrow}
              style={[styles.backButtonImage, { tintColor: '#fff' }]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLiked(v => !v)}
            activeOpacity={0.8}
            style={styles.likeWrap}
          >
            <Image
              source={ICONS.like}
              style={[
                styles.likeIcon,
                { tintColor: liked ? COLORS.danger : COLORS.iconDefault },
              ]}
            />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: selectedImage }} style={styles.mainImage} />
      </View>

      <FlatList
        data={images}
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbList}
        renderItem={({ item }) => {
          const isActive = item === selectedImage;

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setSelectedImage(item)}
              style={[styles.thumbWrap, isActive && styles.thumbActive]}
            >
              <Image source={{ uri: item }} style={styles.thumbImage} />
            </TouchableOpacity>
          );
        }}
      />

      {/* DETAILS */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.brand}>{product.brand}</Text>
          {!cartItem ? (
            <Text style={styles.price}>{`$${product.price}`}</Text>
          ) : (
            <Text style={styles.price}>{`$${
              (product.price * cartItem.quantity).toFixed(2)
            }`}</Text>
          )}
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>

        <Text numberOfLines={3} style={styles.desc}>
          {product.description}
        </Text>
        <Text style={styles.readMore}>{STRINGS.readMore}</Text>

        {/* RATING */}
        <View style={styles.ratingRow}>
          <StarRating
            rating={rating}
            onChange={setRating}
            starSize={22}
            color="#FFD700"
          />
          <Text style={styles.reviewText}>({product.rating.count})</Text>
        </View>
      </View>

      <View>
        {!cartItem ? (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.cartButton}
            onPress={() => dispatch(addToCart(product))}
          >
            <Text style={styles.cartText}>{STRINGS.addToCart}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(decrementQty(product.id))}
            >
              <Text style={styles.qtySymbol}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyText}>{cartItem.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(incrementQty(product.id))}
            >
              <Text style={styles.qtySymbol}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  /* SCREEN */
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  /* IMAGE SECTION */
  imageContainer: {
    backgroundColor: COLORS.black,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },

  mainImage: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: 'contain',
    position: 'relative',
  },

  backButtonWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonImage: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },

  likeWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageOverlay: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  // likeWrap: { 
  //   top: 40,
  //   right: 20,
  //   zIndex: 20,
  // },

  likeIcon: {
    width: 25,
    height: 20,
  },

  /* THUMBNAILS */
  thumbList: {
    padding: 16,
  },

  thumbWrap: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    marginRight: 12,
    padding: 2, // prevents layout jump
  },

  thumbActive: {
    borderWidth: 2,
    borderColor: COLORS.black,
  },

  thumbImage: {
    flex: 1,
    borderRadius: 10,
    resizeMode: 'contain',
  },

  /* CONTENT */
  content: {
    paddingHorizontal: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brand: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },

  title: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
  },

  desc: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  readMore: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },

  /* RATING */
  ratingRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviewText: {
    marginLeft: 8,
    color: COLORS.textSecondary,
  },

  /* CART / QTY */
  cartButton: {
    margin: 20,
    backgroundColor: COLORS.black,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  qtyContainer: {
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    margin: 16,
  },

  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtySymbol: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
  },

  qtyText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
});


export default ProductScreen;
