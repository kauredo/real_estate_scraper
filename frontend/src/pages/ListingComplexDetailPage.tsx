import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getListingComplex } from "@/services/api";
import { ListingComplex } from "@/utils/interfaces";
import Show from "@/components/listingComplex/Show";
import NewShow from "@/components/listingComplex/NewShow";
import MetaTags from "@/components/shared/MetaTags";
import { useTranslation } from "react-i18next";

const ListingComplexDetailPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const previewToken = searchParams.get("preview_token");
  const [listingComplex, setListingComplex] = useState<ListingComplex | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingComplex = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await getListingComplex(
          slug,
          previewToken || undefined,
        );
        setListingComplex(response.data.listing_complex);
      } catch (error) {
        console.error("Error fetching listing complex:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingComplex();
  }, [slug, previewToken]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-default"></div>
      </div>
    );
  }

  if (!listingComplex) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl">{t("errors.listing_complex_not_found")}</h1>
      </div>
    );
  }

  return (
    <>
      <MetaTags
        pageType="enterprises"
        title={listingComplex?.name}
        description={listingComplex?.description?.trim()}
        image={listingComplex?.photos?.[0]?.image?.url}
        type="article"
        url={window.location.href}
      />
      {listingComplex.new_format ? (
        <NewShow complex={listingComplex} />
      ) : (
        <Show complex={listingComplex} />
      )}
    </>
  );
};

export default ListingComplexDetailPage;
